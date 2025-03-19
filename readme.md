we are using 3 types of routes 
1)auth.route.js -> contains  routes of authentication
2)post.route.js -> containes routes of post
3)user.route.js -> contains routes of user

each route will have controller where the functions that will be called for each route is explained

1)auth.controller.js 

here we haveagai 3 func
a)register
b)login
c)logout

a)for register function first we get the body of the post req using req.body and then we hash the password using bcrypt:

 const {username, email,password } = req.body
    //hash the password

    const hashedPassword = await bcrypt.hash(password,10)

bcrypt.hash() has a parameter for original password and salt value which is anynumber and according to that number it will salt the password.


openssl rand -base64 32 command should have been used to generatea random jwt secret key . This needs to be installed and seen later for now I am using just random password from vdo itselfbecause it runs only when installed.


**Axios and cors**
CORS stands for cross origin resource sharing . CORS is a security mechanism that browsers implement to restrict how resources on a web page can be requested from a different domain. 

app.options('*', cors()):

This line handles preflight requests (OPTIONS requests) for all routes. It doesn’t control which URLs are allowed, it just ensures that all routes will respond to preflight requests.
It doesn't make your server open to all URLs; it's just a way to handle OPTIONS requests for any route.

app.use(cors({origin: process.env.CLIENT_URL, credentials: true})):

This is the main line that controls which URLs are allowed to make requests to your server.
origin: process.env.CLIENT_URL ensures that only the URL defined in CLIENT_URL (for example, http://localhost:5173) is allowed to make requests.
credentials: true allows cookies or authentication tokens to be sent along with the request.