namespace DatingApp.API.Helpers
{
    public class MessageParams
    {
        private const int maxPageSize = 50;
        public int PageNumber { get; set; } = 1; // default value
        private int pageSize = 10; // default value
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > maxPageSize) ? maxPageSize : value; }
        }
        public int UserId { get; set; }
        public string MessageContainer { get; set; } = "Unread";
    }
}