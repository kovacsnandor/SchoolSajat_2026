<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSchoolclassRequest extends FormRequest
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
            'osztalyNev' => 'required|string|unique:schoolclasses|min:2|max:10'
        ];
    }
    public function messages(): array
    {
        return [
            'osztalyNev.required' => 'Az osztály nevének megadása kötelező!',
            'osztalyNev.string' => 'Az osztály neve string kell legyen!',
            'osztalyNev.unique' => 'Már van ilyen osztálynév!',
            'osztalyNev.min' => 'Az osztály nevének hossza min: 2',
            'osztalyNev.max' => 'Az osztály nevének hossza max: 75',
        ];
    }
}
