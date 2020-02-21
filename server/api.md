# Moist API
The server uses JSON.

---
### Register user
```
POST /auth/register
```
**Request body**<br>

***Required***

`username` - The username of the user to register.

`email` - The email of the user to register.

`password` - The unhashed password of the user.

*   **Success response**

    **Code:** 200<br>
    **Content:** `{"status":"OK", "error":null, "payload":{}}`<br>
    **Description:** If username or email is not taken and the user is registered in the database.

*   **Error response**

    **Code:** 403<br>
    **Content:** `{"status":"ERROR", "error":"The error message", payload:{}}`<br>
    **Description:** If username or email is taken or if something else went wrong.
