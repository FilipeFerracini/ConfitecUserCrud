namespace Confitec.Domain.Entity
{
    public abstract class BaseEntity
    {
        protected BaseEntity()
        {
        }
        public int Id { get; private set; }
    }

    public abstract class EntityDataBase : BaseEntity
    {
        protected EntityDataBase() : base()
        {
            Active = true;
        }
        public bool Active { get; set; }
    }
}
