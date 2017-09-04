# oauth2 client example

## start

Callback url is `http://localhost:3000/oauth/callback`, use it get oauth2 `client_id` and `client_secret`, put them into `.env`

```bash
# create .env
$ cp .env.example .env
# config .env 
# start
$ npm run dev
```

This repo use [passport](https://github.com/jaredhanson/passport) , [passport-oauth2](https://github.com/jaredhanson/passport-oauth2) and rewrite the `userProfile` method, you can change the logic at `src/passport.js`


## License

MIT &copy; zcong1993
