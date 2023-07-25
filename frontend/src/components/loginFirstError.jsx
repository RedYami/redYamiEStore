import { useNavigate } from "react-router-dom";
export default function LoginError({ handleIsLogin, ErrorMessage }) {
  const navigate = useNavigate();
  function loginFirst() {
    return navigate("/setting/login");
  }
  return (
    <>
      <div className="confirmWidget-overlay">
        <div className="container confirmWidget">
          <div className="reminder">
            <h4 className="text-center">{ErrorMessage}</h4>
            <div className="buttons mt-2 ">
              <button
                onClick={() => handleIsLogin(false)}
                className="cancel btn btn-outline-warning"
              >
                cancel
              </button>
              <button
                className="confirm btn btn-outline-success "
                onClick={() => loginFirst()}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
