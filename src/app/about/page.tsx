export default function AboutPage() {
  return(
    <div className="p-2 sm:p-8 flex-auto overflow-scroll prose">
      <h3 className="text-xl font-semibold">
        About
      </h3>
      <p>
        This provides a readonly view of reddit with extremely limited functionality, may be of value to lurkers and do not go deep into the posts or interact with the posts. It does not use the standard reddit api.
      </p>
      <p className="mt-2">
        This website only stores the following information:
        <ol>
          <li>
            email and a password provided by you if you choose to create an account
          </li>
          <li>
            a list of the subreddits that you choose to follow which you will need to add
          </li>
          <li>
            a cookie to track if you are logged in to this website or not
          </li>
        </ol>
      </p>
      <p>
        You can checkout the code on <a href="https://github.com/panigrah/lurkit" target="_blank">github</a>
      </p>
    </div>
  )
}