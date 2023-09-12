"use client"; // This is a client component 👈🏽
import { login } from "@/actions/loginAction";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import MessageBox from "@/components/MessageBox/MessageBox";
import { setCookie } from "@/utils/cookieHandler";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from './Login.module.css'
import { motion } from "framer-motion"


interface Props {
  // eslint-disable-next-line no-unused-vars
  onSubmitSuccess?: (token: string) => void
}

interface LoginData {
  username: string
  password: string
}

interface Errors {
  username?: string | undefined,
  password?: string | undefined,
  api?: string | number | undefined,
}

export default function Login({onSubmitSuccess}: Props) {
  
  const router = useRouter()

  const [values, setValues] = useState<LoginData>({ username: '', password: '' })
  const [errors, setErrors] = useState<Errors | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  function inputOnChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    const targetName = e.target.name

    setValues(current => ({...current, [targetName]: e.target.value}))

    if(!errors) return
    let errs: Errors = {...errors}
    if(errs?.api) delete errs.api
    if(errs[targetName as keyof Errors]) delete errs[targetName as keyof Errors]
    
    setErrors(Object.entries(errs).length === 0 ? null : errs)
  }

  function validateValues(username: string, password: string) {
    let errs: Errors = {}
    if(!username) errs!.username = 'Username is Required'
    if(!password) errs!.password = 'Password is Required'
    return Object.entries(errs).length === 0 ? null : errs
  }

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const errs = validateValues(values.username, values.password)
    setErrors(errs)

    if(errs) return
    setLoading(true)
    const { err, data } = await login(values)

    if(err) setErrors(current => ({...current, api: err}))
    if(data) {
      setCookie('token', JSON.stringify(data?.token))
      onSubmitSuccess ? onSubmitSuccess(data.token) : router.push('/')
    }
    
    setLoading(false)
  }
  

  return (
    <main className={styles.wrapper}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, translateY: 10 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        viewport={{ once: true }}
      >
        <form onSubmit={submitHandler} className={styles.form}>
          <h1 className={styles.title}>Login</h1>

          {errors?.api && (
            <MessageBox>
              {errors.api}
            </MessageBox>
          )}
          
          <div className={styles.inputs}>
            <Input
              label="Username"
              inputProps={{
                name: 'username',
                type: 'text',
                value: values.username,
                onChange: inputOnChangeHandler,
                disabled: loading
              }}
              error={errors?.username}
            />
            <Input
              label="Password"
              inputProps={{
                name: 'password',
                type: 'password',
                value: values.password,
                onChange: inputOnChangeHandler
              }}
              error={errors?.password}
            />
          </div>

          <Button className="w-full" type="submit" loading={loading} disabled={errors?.api || errors?.username || errors?.password }>
            Submit
          </Button>
        </form>
      </motion.div>
    </main>
  )
}
