using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BDOLife.Infra.Services
{
    public class EmailSender
    {
        public Task SendEmailAsync(string email, string subject, string message)
        {
            // Wire this up to actual email sending logic via SendGrid, local SMTP, etc.
            return Task.CompletedTask;
        }
    }
}
