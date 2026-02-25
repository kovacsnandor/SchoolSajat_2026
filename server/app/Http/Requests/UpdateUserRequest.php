<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        // Kinyerjük az ID-t a /users/{id} útvonalból
        $userId = $this->route('id');

        return [
            'name' => [
                'sometimes',
                'string',
                Rule::unique('users')->ignore($userId), // Ne dobjon hibát a saját nevére
            ],
            'email' => [
                'sometimes',
                'email',
                Rule::unique('users')->ignore($userId), // Ne dobjon hibát a saját emailjére
            ],
            'password' => 'sometimes|string|min:8',
            'role' => [
                'sometimes',
                'integer',
                'between:1,3',
                function ($attribute, $value, $fail) use ($userId) {
                    $user = Auth::user();
                    if ($user && $user->id == $userId && $value != $user->role) {
                        // A fail-nek átadott kulcs lesz a kapocs a messages-hez
                        // $fail('not_self_role'); 
                        $fail('Saját magad szerepkörét biztonsági okokból nem módosíthatod.'); 
                    }
                },
            ],
        ];
    }

    public function messages(): array
    {
       return [
        // Name & Email (csak akkor jönnek elő, ha beküldték az adatot, de az hibás)
        'name.string'       => 'A névnek szöveges formátumúnak kell lennie.',
        'name.unique'      => 'Ez a név már foglalt.',

        'email.email'       => 'Érvényes e-mail címet kell megadni.',
        'email.unique'      => 'Ez az e-mail cím már foglalt.',
        
        // Password
        'password.min'      => 'A jelszónak legalább 8 karakternek kell lennie.',
        
        // Role (A te egyedi logikád és a tartomány ellenőrzése)
        'role.integer'       => 'A szerepkörnek egész számnak kell lennie.',
        'role.between'       => 'A szerepkör csak 1 és 3 közötti érték lehet.',
        // 'role.not_self_role' => 'Saját magad szerepkörét biztonsági okokból nem módosíthatod.',
    ];
    }
}
