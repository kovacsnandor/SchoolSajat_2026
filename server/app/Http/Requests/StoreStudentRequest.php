<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;

class StoreStudentRequest extends FormRequest
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
    // protected function failedValidation(Validator $validator)
    // {
    //     // Itt tudod megadni a SAJÁT hibaüzenetedet
    //     $response = response()->json([
    //         'message' => 'Insert error: The given id number already exists, please choose another one',
    //         'errors' => $validator->errors()
    //     ], 409, options: JSON_UNESCAPED_UNICODE);

    //     throw new ValidationException($validator, $response);
    // }
    public function rules(): array
    {

        return [
            'diakNev' => 'required|string|max:255',
            'schoolclassId' => 'required|integer|exists:schoolclasses,id',
            'neme' => 'required|boolean',
            'iranyitoszam' => 'required|string|max:10',
            'lakHelyseg' => 'required|string|max:100',
            'lakCim' => 'required|string|max:255',
            'szulHelyseg' => 'required|string|max:100',
            'szulDatum' => 'required|date|before:today',
            // Itt az egyediség vizsgálat: unique:táblanév,oszlopnév
            'igazolvanyszam' => 'required|string|unique:students,igazolvanyszam|max:20',
            'atlag' => 'required|numeric|between:1,5',
            'osztondij' => 'required|integer|min:0',
        ];
    }
}
