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
            'diakNev' => 'required|string|min:3|max:50',
            'schoolclassId' => 'required|exists:schoolclasses,id',
            'neme' => 'required|boolean',
            'iranyitoszam' => 'nullable|string|size:4', // Magyar irányítószám általában 4 számjegy
            'lakHelyseg' => 'nullable|string|max:50',
            'lakCim' => 'nullable|string|max:120',
            'szulHelyseg' => 'nullable|string|max:50',
            'szulDatum' => 'nullable|date|before:today',
            'igazolvanyszam' => 'nullable|string|max:15|unique:students,igazolvanyszam',
            'atlag' => 'nullable|numeric|between:1.0,5.0',
            'osztondij' => 'nullable|numeric|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            // diakNev
            'diakNev.required' => 'A diák nevét kötelező megadni.',
            'diakNev.string'   => 'A diák neve csak szöveg lehet.',
            'diakNev.min'      => 'A diák nevének legalább :min karakterből kell állnia.',
            'diakNev.max'      => 'A diák neve nem lehet hosszabb :max karakternél.',

            // schoolclassId
            'schoolclassId.required' => 'Az osztály azonosítója kötelező.',
            'schoolclassId.exists'   => 'A megadott osztály nem létezik a rendszerben.',

            // neme
            'neme.required' => 'A nem megadása kötelező.',
            'neme.boolean'  => 'A nem értéke csak igaz vagy hamis (férfi/nő) lehet.',

            // iranyitoszam
            'iranyitoszam.string' => 'Az irányítószám csak szöveges formátum lehet.',
            'iranyitoszam.size'   => 'Az irányítószámnak pontosan :size karakternek kell lennie.',

            // lakHelyseg
            'lakHelyseg.string' => 'A lakhelyiség neve csak szöveg lehet.',
            'lakHelyseg.max'    => 'A lakhelyiség neve nem lehet hosszabb :max karakternél.',

            // lakCim
            'lakCim.string' => 'A lakcím csak szöveg lehet.',
            'lakCim.max'    => 'A lakcím nem lehet hosszabb :max karakternél.',

            // szulHelyseg
            'szulHelyseg.string' => 'A születési hely csak szöveg lehet.',
            'szulHelyseg.max'    => 'A születési hely nem lehet hosszabb :max karakternél.',

            // szulDatum
            'szulDatum.date'   => 'A születési dátum nem érvényes dátum formátum.',
            'szulDatum.before' => 'A születési dátum nem lehet a mai napnál későbbi.',

            // igazolvanyszam
            'igazolvanyszam.string' => 'Az igazolványszám csak szöveg lehet.',
            'igazolvanyszam.max'    => 'Az igazolványszám nem lehet hosszabb :max karakternél.',
            'igazolvanyszam.unique' => 'Ezzel az igazolványszámmal már rögzítettek egy diákot.',

            // atlag
            'atlag.numeric' => 'Az átlag csak szám lehet.',
            'atlag.between' => 'Az átlagnak :min és :max közé kell esnie.',

            // osztondij
            'osztondij.numeric' => 'Az ösztöndíj összege csak szám lehet.',
            'osztondij.min'     => 'Az ösztöndíj összege nem lehet negatív.',
        ];
    }
}
