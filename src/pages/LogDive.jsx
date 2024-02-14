import DiveLogForm from '../components/forms/DiveLogForm'

const LogDive = ({ toggleAddDiveSite }) => {
  return (
    <div>
      <DiveLogForm toggleAddDiveSite={toggleAddDiveSite}/>
    </div>
  )
}

export default LogDive
