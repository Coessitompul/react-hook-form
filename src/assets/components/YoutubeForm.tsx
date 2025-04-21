import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string
}

export const YoutubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "Batman",
      email: "",
      channel: "",
    }
    // jika ingin mendapatkan value secara dynamic
    // defaultValues: async () => {
    //   const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    //   const data = await response.json();
    //   return {
    //     username: "Batman",
    //     email: data.email,
    //     channel: ""
    //   }
    // }
  });
  const { register, control, handleSubmit, formState } = form;
  // handleSubmit berasal dari library form, pelajari lebih banyak lagi fungsi2 apa saja yang ada didalamnya untuk bisa digunakan
  // const { name, ref, onChange, onBlur } = register("username"); // ini jika meggunakan cara manual,

  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted', data)
  }

  renderCount++;
  return (
    <div>
      <h1>Youtube count ({renderCount/2})</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id='username' 
            {...register('username', {
              required: {
                value: true,
                message: "Username is required"
              }
            })} 
          />
          <p className='error'>{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input 
            type="text" 
            id='email' 
            {...register('email', {
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid Email Format"
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" || "Enter a different email address"
                  )
                },
                notBlackListed: (fieldValue) => {
                  return !fieldValue.endsWith("baddomain.com") || "This domain is not supported"
                }
              }
            })} 
          />
          <p className='error'>{errors.email?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input 
            type="text" 
            id='channel' 
            {...register('channel', {
              required: "Channel is required"
            })} 
          />
          <p className='error'>{errors.channel?.message}</p>
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} /> 
    </div>
  )
}
