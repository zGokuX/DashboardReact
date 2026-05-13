import {
    Envelope,
    Telephone,
    Building,
    Cake,
    GeoAlt,
    Mortarboard,
    Person,
} from "react-bootstrap-icons"

export default function FieldUser({ user }) {

    const fields = [
        { Icon: Envelope, label: "Email", value: user.email },
        { Icon: Telephone, label: "Telefono", value: user.phone },
        { Icon: Building, label: "Azienda", value: user.company?.department },
        { Icon: Cake, label: "Data di nascita", value: user.birthDate },
        { Icon: GeoAlt, label: "Nazione", value: user.address?.country },
        { Icon: Mortarboard, label: "Università", value: user.university },
        { Icon: Person, label: "Genere", value: user.gender },
    ]

    return (
        <ul className="list-unstyled mb-0">
            {fields.map(({ Icon, label, value }) => (
                <li
                    key={label}
                    className="d-flex align-items-center py-2"
                >
                    <Icon size={16} />

                    <span className="ms-2">
                        {label}:
                    </span>

                    <span className="ms-3">
                        {value || "-"}
                    </span>
                </li>
            ))}
        </ul>
    )
}