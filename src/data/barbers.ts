export type Barber = {
  level: string;
  name: string;
  /** Ім'я в родовому відмінку для кнопки «Записатися до …» */
  nameGen: string;
  bio: string;
  /** Сильні сторони для картки — взяті з описів майстрів; власнику варто уточнити */
  focus: string[];
  bookingUrl: string;
  /** Файл фото: src/assets/barbers/{photo}.jpg */
  photo: string;
};

export const barbers: Barber[] = [
  { level: "Арт-директор",     name: "Денис",    nameGen: "Дениса",   focus: ["Підбір образу", "Борода"],
    bio: "Підбере образ, фірмову бороду й зачіску. Дружба автоматично включена в послугу.",
    bookingUrl: "https://b769482.alteg.io/company/723076/select-master?o=m2220164", photo: "denys" },
  { level: "Амбасадор",        name: "Михайло",  nameGen: "Михайла",  focus: ["Підбір стилю", "Сервіс"],
    bio: "Цілеспрямований і дисциплінований. Найвищий рівень сервісу та гарантований результат.",
    bookingUrl: "https://b769482.alteg.io/company/723076/personal/select-master?o=m2214895", photo: "mykhailo" },
  { level: "Прайм-майстер",    name: "Андрій",   nameGen: "Андрія",   focus: ["Текстура", "Подовжені форми"],
    bio: "Ламає шаблони: текстурні подовження, сміливі форми, експерименти з образом.",
    bookingUrl: "https://b769482.alteg.io/company/723076/personal/select-master?o=m2828757", photo: "andrii" },
  { level: "Старший майстер",  name: "Інна",     nameGen: "Інни",     focus: ["Класика", "Деталі"],
    bio: "Увага до кожної деталі, щоб ти почувався комфортно та впевнено.",
    bookingUrl: "https://b769482.alteg.io/company/723076/personal/select-master?o=m2864537", photo: "inna" },
  { level: "Старший майстер",  name: "Мар’ян",   nameGen: "Мар’яна",  focus: ["Класика", "Креативні форми"],
    bio: "Перфекціоніст: точні класичні стрижки й креативні зачіски під каву та розмову.",
    bookingUrl: "https://b769482.alteg.io/company/723076/personal/select-master?o=m2878344", photo: "marian" },
  { level: "Майстер",          name: "Вадим",    nameGen: "Вадима",   focus: ["Довге волосся", "Текстура"],
    bio: "Спеціалізується на довгому волоссі та текстурі. Завжди відкритий до щирої розмови.",
    bookingUrl: "https://b769482.alteg.io/company/723076/personal/select-services?o=m2553779", photo: "vadym" },
  { level: "Молодший майстер", name: "Вікторія", nameGen: "Вікторії", focus: ["Трендові стрижки"],
    bio: "Стежить за трендами та працює охайно з індивідуальним підходом.",
    bookingUrl: "https://b769482.alteg.io/company/723076/personal/select-master?o=m3019823", photo: "viktoriia" },
  { level: "Молодший майстер", name: "Павло",    nameGen: "Павла",    focus: ["Стрижки", "Борода"],
    bio: "Чоловічі стрижки та оформлення бороди з урахуванням твого стилю.",
    bookingUrl: "https://b769482.alteg.io/company/723076/personal/select-master?o=m3083454", photo: "pavlo" },
];
