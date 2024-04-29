namespace API.RequestHelpers
{
    public class MemberParams: PaginationParams
    {
        public string OrderBy { get; set; }
        public string SearchTerm { get; set; }
    }
}