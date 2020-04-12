using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreAngular_EF.Controllers.Models
{
    public class MyDBContext : DbContext //heredar de dbcontext
    {
        public MyDBContext (DbContextOptions <MyDBContext> options):base(options)
        {

        }
        //agregar entities a la base de datos paso 2
        public DbSet<Message> Messages { get; set; }
    }
    //Entidades de las tablas paso 1
    public class Message
    {
        public int id { get; set; }
        public string Name { get; set; }
        public string Text { get; set; }

    }
    //la conexion se hace en el archivo startup paso 3 
}
