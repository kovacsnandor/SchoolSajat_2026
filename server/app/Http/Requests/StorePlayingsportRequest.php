<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Ramsey\Uuid\Type\Integer;

class StorePlayingsportRequest extends FormRequest
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
            //
            'studentId' => [
                'required',
                'integer',
                Rule::unique('playingsports')
                    ->where(fn($q)
                    => $q->where('sportId', request('sportId'))),
                'sportsId' => ['required', 'integer']
            ]
        ];
    }

    public function messages(): array
    {
        return [
            'studentId.required' => 'A diák azonosítója kötelező.',
            'studentId.integer'  => 'A diák azonosítója csak szám lehet.',
            'studentId.unique'   => 'Ez a diák már hozzá van rendelve ehhez a sporthoz!',

            'sportsId.required'  => 'A sport azonosítója kötelező.',
            'sportsId.integer'   => 'A sport azonosítója csak szám lehet.',
        ];
    }
}
