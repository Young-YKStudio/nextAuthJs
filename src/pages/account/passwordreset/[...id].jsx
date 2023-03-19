import { useRouter } from 'next/router'

const PasswordReset = () => {

  const router = useRouter()

  let resetToken = router.query

  console.log(resetToken)

  return (
    <section>
      <p>Password Reset</p>
      {resetToken && <p>{resetToken.id}</p>}
    </section>
  );
}
export default PasswordReset;