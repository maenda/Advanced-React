import Reset from '../components/Reset';

const ResetPage = props => (
  <>
    <p>Reset your password</p>
    <Reset resetToken={props.query.resetToken} />
  </>
);

export default ResetPage;
