'use client'

import {useForm} from 'react-hook-form'

type FormData = {
    name: string
}

export function HomeForm() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>({
        defaultValues: {
            name: '',
        },
    })

    const onSubmit = (data: FormData) => {
        alert(`Hello, ${data.name}!`)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <input
                    {...register('name')}
                    placeholder="이름을 입력하세요"
                    className="w-full p-2 border rounded"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                인사하기
            </button>
        </form>
    )
}