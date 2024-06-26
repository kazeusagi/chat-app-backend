```mermaid
erDiagram

        RoleEnum {
            system system
assistant assistant
user user
        }
    
  "Role" {
    Int id "🗝️"
    RoleEnum name 
    }
  

  "User" {
    Int id "🗝️"
    String name 
    Int roleId 
    }
  

  "Message" {
    Int id "🗝️"
    String content 
    Int chatId 
    Int userId 
    }
  

  "Chat" {
    Int id "🗝️"
    String name 
    }
  
    "Role" o|--|| "RoleEnum" : "enum:name"
    "Role" o{--}o "User" : "users"
    "User" o|--|| "Role" : "role"
    "User" o{--}o "Chat" : "joinedChats"
    "User" o{--}o "Message" : "sentMessages"
    "Message" o|--|| "Chat" : "chat"
    "Message" o|--|| "User" : "user"
    "Chat" o{--}o "User" : "members"
    "Chat" o{--}o "Message" : "messages"
```
