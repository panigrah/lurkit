export default function AboutPage() {
  return(
    <div className="p-2 sm:p-8 flex-auto overflow-scroll">
      <h3 className="text-xl font-semibold">
        About
      </h3>
      <p>
        This provides a readonly view of reddit with extremely limited functionality, may be of value to lurkers and do not go deep into the posts or interact with the posts. It does not use the standard reddit api.
      </p>
      <p className="mt-2">
        This website only stores the following information:
        <ol className="list-disc list-outside ml-6 mt-2">
          <li>
            email and a password provided by you if you choose to create an account
          </li>
          <li>
            a list of the subreddits that you choose to track which you will need to add
          </li>
          <li>
            a cookie to track if you are logged in to this website or not
          </li>
        </ol>
      </p>
    </div>
  )
}