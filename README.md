<table>
  <thead>
    <tr>
      <th>Task</th>
      <th>Points</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GET <code class="language-plaintext highlighter-rouge">/api/v1/github/login</code> route (for redirecting to Github’s OAuth)</td>
      <td>4</td>
    </tr>
    <tr>
      <td>GET <code class="language-plaintext highlighter-rouge">/api/v1/github/login/callback</code> callback URI for Github to redirect to after log in</td>
      <td>4</td>
    </tr>
    <tr>
      <td>DELETE <code class="language-plaintext highlighter-rouge">/api/v1/github</code> signs a user out (i.e. deletes the session cookie)</td>
      <td>1</td>
    </tr>
    <tr>
      <td>GET <code class="language-plaintext highlighter-rouge">/api/v1/posts</code> lists all posts for all users</td>
      <td>2</td>
    </tr>
    <tr>
      <td>POST <code class="language-plaintext highlighter-rouge">{ post }</code> to <code class="language-plaintext highlighter-rouge">/api/v1/posts</code> creates a new post for the signed in user</td>
      <td>2</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GithubUser</code> model</td>
      <td>2</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">Post</code> model</td>
      <td>1</td>
    </tr>
    <tr>
      <td>Authentication middleware for protecting <code class="language-plaintext highlighter-rouge">/api/v1/posts</code></td>
      <td>2</td>
    </tr>
    <tr>
      <td>Each route has tests</td>
      <td>2</td>
    </tr>
  </tbody>
</table>