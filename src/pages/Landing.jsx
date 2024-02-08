import { useNavigate } from 'react-router-dom'

const Landing = () => {

  let navigate = useNavigate()

  return (
    <div>
        <button onClick={() => navigate('/signin')}>
          Click Here To Get Started
        </button>
    </div>
  )
}

export default Landing