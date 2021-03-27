const Login = () => {


    const dispatch = useDispatch()
    
    const [userInput, setUserInput] = useState({
		username: '',
		password: '',
	})

	const handleOnChange = (e) => {
		setUserInput({ ...userInput, [e.target.name]: e.target.value })
	}

    const handleOnSubmit = (e) => {
		e.preventDefault()
		loginUser()
	}

	const loginOptions = {
		method: 'POST',
		body: JSON.stringify(userInput),
		headers: {
			'Content-Type': 'application/json',
		},
	}
	const loginUser = async () => {
		const response = await fetch('/api/login', loginOptions)
		const data = await response.json()
        console.log(data)
		if (data.error_message === "") {
            console.log(data)
            dispatch(loginUserAction({id: data.user_id, username: data.username}))
			setUserInput({
				username: '',
				password: '',
			})
            history.replace(from)
		} else {
			alert(data.error_message)
		}
	}}
    