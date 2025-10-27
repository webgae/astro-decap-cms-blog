import { useState } from 'preact/hooks';

function FaqItem({ item, isOpen, onClick }) {
	return (
		<div className={`faq-item ${isOpen ? 'is-open' : ''}`}>
			<button className="faq-question" onClick={onClick}>
				<span>{item.question}</span>
				<span className="faq-icon"></span>
			</button>
			<div className="faq-answer">
				<p>{item.answer}</p>
			</div>
		</div>
	);
}

export default function FaqAccordion({ items }) {
	const [openIndex, setOpenIndex] = useState(null);

	const handleClick = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="faq-accordion">
			{items.map((item, index) => (
				<FaqItem
					key={index}
					item={item}
					isOpen={openIndex === index}
					onClick={() => handleClick(index)}
				/>
			))}
		</div>
	);
}
