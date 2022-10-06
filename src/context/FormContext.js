import { createContext, useState, useEffect } from "react"

const FormContext = createContext({})



export const FormProvider = ({ children }) => {
  
  //? this is a lookup object representing the page
  const title = {
    0:"Billing info",
    1:"Shipping info",
    2:"Opt-In"
  }
  const [page, setPage] = useState(0)
  
  const [data, setData] = useState({
    billFirstName: "",
    billLastName: "",
    billAddress1: "",
    billAddress2: "",
    billCity: "",
    billState: "Alabama",
    billZipCode: "",
    sameAsBilling: false,
    shipFirstName: "",
    shipLastName: "",
    shipAddress1: "",
    shipAddress2: "",
    shipCity: "",
    shipState: "Alabama",
    shipZipCode: "",
    optInNews: false
  })

  const handleChange = e => {
    const type = e.target.type

    const name = e.target.name

    const value = type === "checkbox"
        ? e.target.checked
        : e.target.value

    setData(prevData => ({
        ...prevData,
        [name]: value
    }))
  }
  
  //! useEffect to check to see if teh same as billing changed if it changed to true we set the shipping data same as the billing data if its false we set all the shipping data back to empty
  useEffect(() => {
    if (data.sameAsBilling) {
        setData(prevData => ({
            ...prevData,
            shipFirstName: prevData.billFirstName,
            shipLastName: prevData.billLastName,
            shipAddress1: prevData.billAddress1,
            shipAddress2: prevData.billAddress2,
            shipCity: prevData.billCity,
            shipState: prevData.billState,
            shipZipCode: prevData.billZipCode
        }))
    } else {
        setData(prevData => ({
            ...prevData,
            shipFirstName: "",
            shipLastName: "",
            shipAddress1: "",
            shipAddress2: "",
            shipCity: "",
            shipState: "",
            shipZipCode: ""
        }))
    }
}, [data.sameAsBilling])


  //! we remove the not required data leaving only the required to check if they are true
  const { billAddress2,sameAsBilling,shipAddress2,optInNews,...requiredInputs } = data
    
  //! all required and last page
  const canSave = [...Object.values(requiredInputs)].every(Boolean) && page === Object.keys(title).length - 1


  const handlePrev = () => { 
    setPage((prev)=>prev-1)
  }
  const handleNext = () => { 
    setPage((prev)=>prev+1)
  }
  
  const firstPageDone = Object.keys(data)
  .filter(key => key.startsWith('bill') && key !== 'billAddress2')
  .map(key => data[key])
  .every(Boolean)
  console.log(data)
  
  
  const secondPageDone = Object.keys(data)
    .filter(key => key.startsWith('ship') && key !== 'shipAddress2')
    .map(key => data[key])
    .every(Boolean)
    
  //! we use both these functions to determine whether to disable the button or not
  
  
  const disablePrev = page === 0
  
  const prevHide = page === 0 && "remove-button"

  const nextHide = page === Object.keys(title).length - 1 && "remove-button"

  const submitHide = page !== Object.keys(title).length - 1 && "remove-button" //TODO: make it the invert of nextHide
  
  //^ if we are in the last page OR we are on the first page but first page is not done
  const disableNext =
    (page === Object.keys(title).length - 1)
    || (page === 0 && !firstPageDone)
    || (page === 1 && !secondPageDone)

    
    return (
    <FormContext.Provider value={{data, setData,title,page,setPage,canSave,handleChange,handlePrev,handleNext,prevHide,nextHide,submitHide,disablePrev,disableNext}}>
        {children}
    </FormContext.Provider>
  )
}

export default FormContext