<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSchoolclassRequest extends FormRequest
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
        $id = $this->route('id');
        return [
            'osztalyNev' => [
                'required',
                'string',
                'min:2',
                'max:10',
                // Itt mondjuk meg, hogy legyen egyedi, de hagyja ki az aktuális ID-t
                Rule::unique('schoolclasses', 'osztalyNev')->ignore($id),
            ],
        ];
    }
    public function messages(): array
    {
        return [
            'osztalyNev.required' => 'Az osztály nevének megadása kötelező!',
            'osztalyNev.string' => 'Az osztály neve string kell legyen!',
            'osztalyNev.unique' => 'Már van ilyen osztálynév!',
            'osztalyNev.min' => 'Az osztály nevének hossza :min!',
            'osztalyNev.max' => 'Az osztály nevének hossza :max!',
        ];
    }
}
