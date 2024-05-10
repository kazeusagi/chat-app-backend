```mermaid
erDiagram

  "Role" {

    }
  

  "User" {

    }
  

  "Message" {

    }
  

  "Chat" {

    }
  
    "Role" o{--}o "User" : "users"
    "User" o|--|| "Role" : "role"
    "User" o{--}o "Chat" : "joinedChats"
    "User" o{--}o "Message" : "sentMessages"
    "Message" o|--|| "Chat" : "chat"
    "Message" o|--|| "User" : "user"
    "Chat" o{--}o "User" : "member"
    "Chat" o{--}o "Message" : "messages"
```
