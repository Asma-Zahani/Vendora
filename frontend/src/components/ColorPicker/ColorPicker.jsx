/* eslint-disable react/prop-types */
const Colors = ({ options, formData, setFormData }) => {
    const handleClick = (item) => {
        setFormData((prevFormData) => {
            const couleurs = Array.isArray(prevFormData.couleurs) ? prevFormData.couleurs : []; // Assurez-vous que couleurs est un tableau

            const isSelected = couleurs.some(color => color.couleur_id === item.couleur_id);
            
            let updatedColors;
            if (isSelected) {
                updatedColors = couleurs.filter(color => color.couleur_id !== item.couleur_id);
            } else {
                updatedColors = [...couleurs, item];
            }

            return { ...prevFormData, couleurs: updatedColors };
        });
    };

    return (
        <div className="flex gap-2 overflow-y-auto scrollbar flex-grow">
            {options.map((item, index) => (
                <div
                    key={index}
                    onClick={() => handleClick(item)}
                    className={`w-8 h-8 rounded-full border-2 ${formData.couleurs && formData.couleurs.some(color => color.couleur_id === item.couleur_id) ? 'border-purple-500' : 'border-borderGrayLight'}`}
                    style={{ backgroundColor: item.code_hex }}
                ></div>
            ))}
        </div>
    );
};

export default Colors;
