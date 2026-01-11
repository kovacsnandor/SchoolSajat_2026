<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserPasswordRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Mivel a bejelentkezett user a saját jelszavát módosítja, ez true
        return true; 
    }

    public function rules(): array
    {
        return [
            // Ellenőrzi, hogy a megadott 'oldpassword' azonos-e a DB-ben lévővel
            'oldpassword' => ['required', 'current_password'], 
            'newpassword' => ['required', 'string', Password::min(3), 'confirmed'],
        ];
    }
}