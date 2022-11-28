namespace Confitec.Infra.CrossCutting
{
    public class Notification
    {
        public enum EventNotification
        {
            Insert = 1,
            Update = 2,
            Delete = 3
        }
        public enum Priority
        {
            High = 1,
            Average = 2,
            Low = 3
        }
        public enum Layer
        {
            App = 1,
            Domain = 2,
            Repository = 3,
            Others = 4
        }
        public enum TypeNotificationNotify
        {
            Alert = 1,
            Error = 2,
            Sucess = 3,
            Information = 4
        }
        public enum NotifyIntention
        {
        }

        public class Notify
        {
            public Notify()
            {
                Priority = Priority.Average;
                TypeNotificationNotify = TypeNotificationNotify.Error;
                PropertyErrors = new List<string>();
            }

            public Priority Priority { get; set; }
            public Layer? Layer { get; set; }
            public TypeNotificationNotify TypeNotificationNotify { get; set; }
            public string Message { get; set; } = "";
            public NotifyIntention? NotifyIntention { get; set; }
            public List<string> PropertyErrors { get; set; }
        }

        public class LNotifications : List<Notify>
        {
            new void Add(Notify notification) => base.Add(notification);

            new void AddRange(IEnumerable<Notify> notifications)
            {
                foreach (var notification in notifications)
                    Add(notification);
            }

            public bool HasErros { get { return this.Any(x => x.TypeNotificationNotify == TypeNotificationNotify.Error); } }
            public bool HasAlerts { get { return this.Any(x => x.TypeNotificationNotify == TypeNotificationNotify.Alert); } }
            public bool HasSucess { get { return this.Any(x => x.TypeNotificationNotify == TypeNotificationNotify.Sucess); } }
            public bool HasInformations { get { return this.Any(x => x.TypeNotificationNotify == TypeNotificationNotify.Information); } }
            public bool HasNotifications { get { return this.Any(); } }
        }
    }
}
