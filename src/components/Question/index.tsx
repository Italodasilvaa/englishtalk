import { ReactNode } from 'react';
import classNames from 'classnames';//serve para diminuir as class names e fazer configuracao 

import './styles.scss'

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;

}


export function Question({
  content,//Aqui eu deselearizei o props para ter acesso a todas funcoes dentro
  author,
  isAnswered = false,
  isHighlighted = false,
  children,
}: QuestionProps) {

  return (
    <div
      //so vai adicionar a classe se as propriedades chamdas forem true 
      className={classNames('question', { answered: isAnswered }, { highlighted: isHighlighted && !isAnswered })}
    // className={`question${isAnswered ? 'answered' : ''} ${isHighlighted ? 'highlighted' : ''}`}
    //AS DUAS FORMAS DE FAZER ADICIONAR CLASSE SE FOR TRUE OU FALSE 
    >

      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>


  );
}