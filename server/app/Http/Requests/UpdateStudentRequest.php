<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateStudentRequest extends FormRequest
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
      // route paraméter neve: students/{id}
        $studentId = $this->route('id');

        return [
// A 'sometimes' azt jelenti: csak akkor validálj, ha a mező jelen van a kérésben
            'diakNev' => 'sometimes|string|max:255',
            'schoolclassId' => 'sometimes|integer|exists:schoolclasses,id',
            'neme' => 'sometimes|boolean',
            'iranyitoszam' => 'sometimes|string|max:10',
            'lakHelyseg' => 'sometimes|string|max:100',
            'lakCim' => 'sometimes|string|max:255',
            'szulHelyseg' => 'sometimes|string|max:100',
            'szulDatum' => 'sometimes|date|before:today',
            
            // UNIQUE TRÜKK: Figyelmen kívül hagyjuk a jelenlegi diák ID-ját
            'igazolvanyszam' => [
                'sometimes',
                'string',
                'max:20',
                Rule::unique('students', 'igazolvanyszam')->ignore($studentId),
            ],
            
            'atlag' => 'sometimes|numeric|between:1,5',
            'osztondij' => 'sometimes|integer|min:0',
        ];
    }
}
