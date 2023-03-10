import React , {useState}from 'react'
import { Paper, Stepper, Step, StepLabel, Typography,CircularProgress, Divider, Button } from '@material-ui/core'
import useStyles from './styles'
import { Form } from 'react-router-dom'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'

const steps =['Shipping address','Payment Details']

const Checkout = () => {
  const [activeStep, setActiveStep]=useState(0);
  const classes = useStyles()

  const Confirmation = ()=>(
    <div>
      Confirmation
    </div>
  )

  const form = () => activeStep === 0 
  ? <AddressForm/> : <PaymentForm/>
  return (
    <>
      <div className={classes.toolbar}/>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h4' align='center'></Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((step)=>(
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
          </Stepper>
          {activeStep ===steps.length ? <Confirmation/> : <Form/>}
        </Paper>
      </main>
    </>
  )
}

export default Checkout