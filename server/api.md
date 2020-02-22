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
    **Content:** `{"payload":{}}`<br>
    **Description:** If username or email is not taken and the user is registered in the database.

*   **Error response**

    **Code:** 403<br>
    **Content:** `{"error":"The error message", payload:{}}`<br>
    **Description:** If username or email is taken or if something else went wrong.


### Login user
```
POST /auth/login
```
**Request body**<br>

***Required***

`email` - The email of the user to login.

`password` - The unhashed password of the user.

*   **Success response**

    **Code:** 200<br>
    **Content:** `{"payload":{}}`<br>
    **Description:** If the email and password matches and are correct.

*   **Error response**

    **Code:** 403<br>
    **Content:** `{"error":"The error message", payload:{}}`<br>
    **Description:** If wrong credentials or something else is wrong.


### Request password reset
Sends an email to the user, if there is one.
```
POST /auth/resetpassword/request
```
**Request body**<br>

***Required***

`email` - The email of the user to login.

`username` - The username.

*   **Response**

    **Code:** 200<br>
    **Content:** `{}`<br>
    **Description:** Always returns OK.

### Set password reset
```
POST /auth/resetpassword/update
```
**Request body**<br>

***Required***

`email` - The email of the user to login.

`password` - The new password.

`key` - The password reset key.

*   **Response**

    **Code:** 200<br>
    **Content:** `{"status":"Password reset"}`<br>
    **Description:** If password successfully reset.

    **Code:** 403<br>
    **Content:** `{"status":"Password too short"}`<br>
    **Description:** If password is too short.

    **Code:** 404<br>
    **Content:** `{"status":"Not a valid key"}`<br>
    **Description:** If key is invalid.

    **Code:** 500<br>
    **Content:** `{"status":"Internal server error"}`<br>
    **Description:** If something wrong happened.

