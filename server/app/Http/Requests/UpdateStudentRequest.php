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
        $id = $this->route('id');

        return [
            // A 'sometimes' azt jelenti: csak akkor validálj, ha a mező jelen van a kérésben
            'diakNev'        => 'sometimes|string|min:3|max:255',
            'schoolclassId'  => 'sometimes|integer|exists:schoolclasses,id',
            'neme'           => 'sometimes|boolean',
            'iranyitoszam'   => 'sometimes|nullable|string|max:10',
            'lakHelyseg'     => 'sometimes|nullable|string|max:100',
            'lakCim'         => 'sometimes|nullable|string|max:255',
            'szulHelyseg'    => 'sometimes|nullable|string|max:100',
            'szulDatum'      => 'sometimes|nullable|date|before:today',
            'igazolvanyszam' => [
                'sometimes',
                'nullable',
                'string',
                'max:20',
                Rule::unique('students', 'igazolvanyszam')->ignore($id),
            ],
            'atlag'          => 'sometimes|nullable|numeric|between:1,5',
            'osztondij'      => 'sometimes|nullable|integer|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            // diakNev
            'diakNev.string'   => 'A diák neve csak szöveg lehet.',
            'diakNev.min'      => 'A névnek legalább :min karakternek kell lennie.',
            'diakNev.max'      => 'A név nem lehet hosszabb :max karakternél.',

            // schoolclassId
            'schoolclassId.integer' => 'Az osztály azonosítója csak szám lehet.',
            'schoolclassId.exists'  => 'A megadott osztály nem létezik az adatbázisban.',

            // neme
            'neme.boolean' => 'A nem értéke csak érvényes logikai jelölés lehet.',

            // iranyitoszam
            'iranyitoszam.string' => 'Az irányítószám formátuma érvénytelen.',
            'iranyitoszam.max'    => 'Az irányítószám maximum :max karakter lehet.',

            // lakHelyseg / lakCim / szulHelyseg
            'lakHelyseg.max'  => 'A lakhelyiség neve maximum :max karakter.',
            'lakCim.max'      => 'A lakcím maximum :max karakter.',
            'szulHelyseg.max' => 'A születési hely maximum :max karakter.',

            // szulDatum
            'szulDatum.date'   => 'A születési dátum nem érvényes dátum.',
            'szulDatum.before' => 'A születési dátum csak múltbéli időpont lehet.',

            // igazolvanyszam
            'igazolvanyszam.string' => 'Az igazolványszám formátuma érvénytelen.',
            'igazolvanyszam.max'    => 'Az igazolványszám maximum :max karakter lehet.',
            'igazolvanyszam.unique' => 'Ez az igazolványszám már egy másik diákhoz tartozik.',

            // atlag
            'atlag.numeric' => 'Az átlag csak számjegy lehet (pl. 4.5).',
            'atlag.between' => 'Az átlagnak :min és :max közé kell esnie.',

            // osztondij
            'osztondij.integer' => 'Az ösztöndíj összege csak egész szám lehet.',
            'osztondij.min'     => 'Az ösztöndíj nem lehet negatív összeg.',
        ];
    }
}
