using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Application.ViewModels
{
    public class NodeViewModel
    {
        public string id { get; set; }
        public string parent { get; set; }
        public string text { get; set; }
        public string icon { get; set; }
        public Object li_attr { get; set; }
        public Object state { get; set; }
        public string nomeItem { get; set; }
        public long quantidade { get; set; }
        public long valor { get; set; }
        public string grupo { get; set; }
    }
}
