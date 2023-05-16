import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const addProductValidationSchema = Yup.object({
  name: Yup.string().required('Adı daxil etmək vacibdir')
  .max(50, 'Ad max 50 simvol olmalıdır'),

  email: Yup.string().required('Email vacibdir')
    .email('Düzgün bir e-mail ünvanı daxil edin')
    .matches(/@code\.edu\.az$/, 'Yalnız @code.edu.az ilə bitən email qəbul edilir'),
    //Bu, Yup sxeminin uyğunluğu üsuludur və müəyyən bir nümunəyə uyğunlaşdırmaq üçün istifadə olunur.
    //Bu nümunə müntəzəm ifadə (regex) kimi müəyyən edilmişdir.
    //Sahənin dəyərinin müəyyən bir nümunəyə uyğun olub olmadığını yoxlamaq üçün uyğunluqlar metodundan istifadə edilə bilər.
    //  "/ ..../" bu isare baslangic ve bitisi mueyyen edir
    // \ ..\ bu isare ise ortadakidi
    // $ (dolar işareti) karakteri, bir desenin bir satırın sonuna uyması gerektiğini belirtir.
    // Yani, desenin tam olarak satır sonunda eşleşmesi gerektiğini ifade eder.
    //Örneğin, /@code\.edu\.az$/ deseni, bir dizedeki @code.edu.az ifadesini arar, ancak bu ifadenin dizenin sonunda yer alması gerektiğini belirtir. 
    //Örneğin, "ornek@code.edu.az" ifadesi bu desene uygun olurken,
    // "ornek@code.edu.az.tr" veya "ornek@code.edu.az.com" gibi ifadeler uygun olmayacaktır.
  gender: Yup.string().required('Cinsiyyət vacibdir'),

  password: Yup.string()
    .min(8, 'Şifrə min 8 simvol olmalıdır')
    .required('Şifrə vacibdir'),

  acceptPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Şifrələr bir-birinə uyğun olmalıdır ')
    //oneOf Yup şemasının bir yöntemidir ve bir alanın değerini belirli bir dizi değerle karşılaştırmak için kullanılır.
    // Bu yöntem, alanın belirli değerlerden biriyle eşleşip eşleşmediğini kontrol etmek için kullanılır.
    // oneOf yöntemi, bir dizi değer alır 
    //Yup.ref('password') ifadesi, password alanının değerini referans olarak alır.
    // Yani, acceptPassword alanının değeri password alanıyla aynı olmalıdır. 
    //null ise boş değeri temsil eder. Bu sayede, acceptPassword alanının boş olmasına izin verilir.

    //example:gender: Yup.string().oneOf(['female', 'male'], 'Cinsiyet zorunludur')
    //Bu örnekte, oneOf yöntemi kullanılarak ['female', 'male'] dizi değeri belirtilmiştir. 
    //gender alanının sadece bu dizi değerlerinden biriyle eşleşmesi gerekmektedir. 
    //Eğer eşleşme sağlanmazsa, "Cinsiyet zorunludur" hata mesajı görüntülenir.
    .required('Şifrə təsdiqi vacibdir'),
});

function FormikSample() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      gender: 'female',
      password: '',
      acceptPassword: '',
    },
    validationSchema: addProductValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      alert('Qeydiyyat uğurla tamamlandı');
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Ad:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && (
          //formik.touched.name ve formik.errors.name ifadesi,
          // Formik kütüphanesinin sağladığı özelliklerdir ve bir form alanının dokunulup dokunulmadığını
          // ve hata olup olmadığını kontrol etmek için kullanılır.
          //formik.touched.name ifadesi, name alanına dokunulup dokunulmadığını kontrol eder. Eğer name alanına dokunulmuşsa (yani kullanıcı o alanı etkilemişse), bu ifade true değerini döndürür.
          // Dokunulmamışsa veya başlangıç durumunda ise false değerini döndürür.
          //formik.errors.name ifadesi, name alanındaki olası bir doğrulama hatasını temsil eder. Eğer name alanı doğrulama kurallarını geçemezse,
          // bu ifade hatanın ayrıntılarını içeren bir nesneyi döndürür
          <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{formik.errors.name}</p>
        )}
        
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>E-mail:</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{formik.errors.email}</p>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Cinsiyyət:</label>
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={formik.handleChange}
              checked={formik.values.gender === 'female'}
            />
            Qadın
          </label>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={formik.handleChange}
              checked={formik.values.gender === 'male'}
              //checked özelliği, bir <input> elementinin durumunu belirlemek için kullanılır.
              // Bu özellik, özellikle type="radio" veya type="checkbox" input tipleri için kullanılır.
              //checked özelliğine true değeri atanırsa, ilgili <input> öğesi seçili veya işaretlenmiş olarak görüntülenir.
              //checked özelliğine false değeri atanırsa veya özelliğin hiçbir değeri belirtilmezse, 
              //ilgili <input> öğesi seçili veya işaretlenmemiş olarak görüntülenir.
            />
           Kişi
          </label>
        </div>
        {formik.touched.gender && formik.errors.gender && (
          <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{formik.errors.gender}</p>
        )}
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '5px' }} htmlFor="password">Şifrə:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password &&
        (
          <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{formik.errors.password}</p>
          )}
          </div>
          <div>
    <label style={{ display: 'block', marginBottom: '5px' }} htmlFor="acceptPassword">Şifrə Təsdiqi:</label>
    <input
      type="password"
      id="acceptPassword"
      name="acceptPassword"
      onChange={formik.handleChange}
      value={formik.values.acceptPassword}
    />
    {formik.touched.acceptPassword && formik.errors.acceptPassword && (
      <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{formik.errors.acceptPassword}</p>
    )}
  </div>

  <div>
    <button style={{
        background: '#4caf50',
        color: 'white',
        border: 'none',
        marginTop:"20px",
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
      }} type="submit">Qeydiyyat</button>
  </div>
</form>
);
}

export default FormikSample;
