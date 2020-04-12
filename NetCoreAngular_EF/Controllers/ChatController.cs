using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NetCoreAngular_EF.Models.ViewModels;
using NetCoreAngular_EF.Models;
using NetCoreAngular_EF.Models.Response;

namespace NetCoreAngular_EF.Controllers
{
    [Route("api/[controller]")]
    public class ChatController : Controller
    {
        private Models.MyDBContext db;

        public ChatController(Models.MyDBContext context)
        {
            db = context;
        }
        [HttpGet("[action]")]
        /*public IEnumerable<Models.Message> Message()
        {
            List<Models.Message> list = null;
            list = db.Messages.ToList();
            return list;
        }*/
        public IEnumerable<MessageViewModel> Message()
        {
            
            List<MessageViewModel> list = (from d in db.Messages
                                           orderby d.id descending
                                         select new MessageViewModel
                                         {
                                             id = d.id,
                                             Name = d.Name,
                                             Text = d.Text
                                         }).ToList(); 
            return list;
        }
        [HttpPost("[action]")]
        public MyResponse InsertarDatos([FromBody] MessageViewModel model)
        {
            MyResponse oR = new MyResponse();
            try
            {
                Models.Message oMessage = new Models.Message();
                oMessage.Name = model.Name;
                oMessage.Text = model.Text;
                db.Messages.Add(oMessage);
                db.SaveChanges();
                oR.Success = 1; 
            }
            catch (Exception ex)
            {
                oR.Success = 0;
                oR.Message = ex.Message;
            }
            return oR;
        }

    }
}