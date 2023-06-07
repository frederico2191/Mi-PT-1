
class CRUDService:
    def save(self,data):
        raise NotImplementedError(
        )
    def get(self,data):
        raise NotImplementedError(
        )
    def update(self,data):
        raise NotImplementedError(
        )
    def delete(self,data):
        raise NotImplementedError(
        )
        
class CRUService:
    def save(self,data):
        raise NotImplementedError(
        )
    def get(self,data):
        raise NotImplementedError(
        )
    def update(self,id,data):
        raise NotImplementedError(
        )
  
class GetService:
    def get(self,data):
        raise NotImplementedError(
        )



# class AbstractRepository:
#     def add(entry_to_be_registered):
#         db.session.add(entry_to_be_registered)
#         db.session.commit()
#         return 200

#     def delete(entry_to_be_deleted):
#         db.session.delete(entry_to_be_deleted)
#         db.session.commit()
#         return 200

#     def update(entry_to_be_updated,id):
#         db.session.commit()
#         return 200
    
#     def filtering(entry_to_be_filtered):
#         return given_repository.db.session.commit()

#     def get_by_id(id):
#         # element = 
#         return element





    