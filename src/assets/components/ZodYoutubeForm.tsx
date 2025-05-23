import { useForm, useFieldArray, FieldErrors } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";

const schema = z.object({
  username: z.string().nonempty("Username is required"),
  email: z.string().nonempty("Email is required").email("Email format is not valid"),
  channel: z.string().nonempty("Channel is required")
});

type FormValues = {
  username: string;
  email: string;
  channel: string;
}

export const ZodYoutubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "Batman",
      email: "",
      channel: ""
    },
    resolver: zodResolver(schema)
  });
  const { 
    register, 
    control, 
    handleSubmit, 
    formState
  } = form;
  // handleSubmit berasal dari library form, pelajari lebih banyak lagi fungsi2 apa saja yang ada didalamnya untuk bisa digunakan
  // const { name, ref, onChange, onBlur } = register("username"); // ini jika meggunakan cara manual,

  const { 
    errors, 
  } = formState;

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted', data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id='username' 
            {...register('username')} 
          />
          <p className='error'>{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input 
            type="text" 
            id='email' 
            {...register('email')} 
          />
          <p className='error'>{errors.email?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input 
            type="text" 
            id='channel' 
            {...register('channel')} 
          />
          <p className='error'>{errors.channel?.message}</p>
        </div>

        <button>Submit</button> 
      </form>
      <DevTool control={control} /> 
    </div>
  )
}
