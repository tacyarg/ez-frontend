export async function Authenticate(
  actions,
  tokenid = window.localStorage.getItem('tokenid')
) {
  if (tokenid == null) {
    return Authenticate(actions, await actions.auth.call('token'))
  }

  return actions.auth
    .call('authenticate', tokenid)
    .then(userid => {
      window.localStorage.setItem('tokenid', tokenid)
      return { userid, tokenid }
    })
    .catch(err => {
      return Authenticate(actions)
    })
}
