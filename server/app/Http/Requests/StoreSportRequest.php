<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSportRequest extends FormRequest
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
            'sportNev' => 'required|unique:sports|string|min:2|max:75',
        ];
    }

        public function messages(): array
    {
        return [
            'sportNev.required' => 'A sport nevének megadása kötelező!',
            'sportNev.string' => 'A sport neve string kell legyen!',
            'sportNev.unique' => 'Már van ilyen sportnév!',
            'sportNev.min' => 'A sport nevének hossza min: 2!',
            'sportNev.max' => 'A sport nevének hossza max: 75!',
        ];
    }


}
