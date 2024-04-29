using API.Entities;

namespace API.Extensions
{
    public static class MemberExtensions
    {
        public static IQueryable<Membru> Sort(this IQueryable<Membru> query, string orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(m => m.Nume);

            query = orderBy switch
            {
                "varsta" => query.OrderBy(m => m.Varsta),
                "varstaDesc" => query.OrderByDescending(m => m.Varsta),
                _ => query.OrderBy(m => m.Nume)
            };

            return query;
        }
        
        public static IQueryable<Membru> Search(this IQueryable<Membru> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(m => m.Nume.ToLower().Contains(lowerCaseSearchTerm));
        }
    }
}