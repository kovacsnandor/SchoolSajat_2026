<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePlayingsportRequest extends FormRequest
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
        // Megszerezzük a rekord azonosítóját a route-ból
        // Pl. /api/playingsports/{playingsport}
        $id = $this->route('id');

        return [
            'studentId' => [
                'sometimes',
                'integer',
                Rule::unique('playingsports', 'studentId')
                    ->where(fn($q) => $q->where('sportId', $this->sportId))
                    ->ignore($id), // Ez zárja ki az aktuális rekordot
            ],
            'sportId' => ['sometimes', 'integer'],
        ];
    }

    public function messages(): array
    {
        return [
            'studentId.integer' => 'A diák azonosítója csak szám lehet.',
            'studentId.unique'  => 'Ez a párosítás (diák és sport) már létezik egy másik bejegyzésben.',

            'sportId.integer'   => 'A sport azonosítója csak szám lehet.',
        ];
    }
}
