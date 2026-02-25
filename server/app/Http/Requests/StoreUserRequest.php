<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'     => 'required|string|unique:users,name|max:255',
            'email'    => 'required|email|unique:users,email|max:255',
            'password' => 'required|string|min:8',
            // Itt a változtatás:
            'role'     => 'nullable|integer|between:1,3'

        ];
    }


    public function messages(): array
    {
        return [
            'name.required'     => 'A név megadása kötelező.',
            'name.string'       => 'A név csak szöveges formátumú lehet.',
            'name.unique'      => 'Ez a név már használatban van.',
            'name.max'          => 'A név nem lehet hosszabb 255 karakternél.',

            'email.required'    => 'Az e-mail cím megadása kötelező.',
            'email.email'       => 'Érvényes e-mail címet kell megadni.',
            'email.unique'      => 'Ez az e-mail cím már használatban van.',
            'email.max'         => 'Az e-mail cím nem lehet hosszabb 255 karakternél.',

            'password.required' => 'A jelszó megadása kötelező.',
            'password.string'   => 'A jelszó formátuma érvénytelen.',
            'password.min'      => 'A jelszónak legalább 8 karakterből kell állnia.',

            'role.integer' => 'A szerepkörnek számnak kell lennie.',
            'role.between' => 'A szerepkör értéke csak 1 és 3 közötti szám lehet.',
        ];
    }
}
