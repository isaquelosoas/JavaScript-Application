import axios from 'axios';
class App {
    constructor(){
        this.repositories = [];
        this.formEl =  document.getElementById('repo');
        this.listEl =  document.getElementById('list');
        this.inputEl =  document.querySelector('input');       
        this.registerHandlers();            
    }
    registerHandlers(){
        this.inputEl.setAttribute('placeholder','Insira o repositório');
        this.formEl.onsubmit = (event) => this.addRepository(event);
    }
    async buscaRepo(repo){
        try{
            let repositorio = await axios.get(`http://api.github.com/search/repositories?q=${repo}+user:isaquelosoas`);
            return repositorio;
        }
        catch{
            console.log('Não foi possivel');
        }
    }  
    async addRepository(){
        event.preventDefault();
        let inputValue = this.inputEl.value;
        let repositorio = await this.buscaRepo(inputValue); 
        console.log(repositorio);
        if (repositorio.data.total_count !== 0){
            this.repositories.push({
                nome: repositorio.data.items[0].name,
                autor:`Autor: ${repositorio.data.items[0].owner.login}`,
                avatar_url: repositorio.data.items[0].owner.avatar_url,
                repo_url:repositorio.data.items[0].clone_url,  
            });        
            console.log(this.repositories);
            this.render();
            this.inputEl.value = ""; 
            console.log(document.querySelector('form#repo strong'));
                  
        }
        else {
            this.inputEl.value = ""; 
            this.inputEl.setAttribute('placeholder','Repositório não encontrado');                      
        }
        
        
        
    }      
        
    
    render(){
        this.listEl.innerHTML = '';
        this.repositories.forEach(repo =>{
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);
            let strEl = document.createElement('strong');            
            strEl.appendChild(document.createTextNode(repo.nome));
            let pEl = document.createElement('p');
            pEl.appendChild(document.createTextNode(repo.autor));
            let aEl = document.createElement('a');
            aEl.setAttribute('target','__blank');
            aEl.setAttribute('href', repo.repo_url);
            aEl.appendChild(document.createTextNode('Acessar'));
            let liEl = document.createElement('li');
            liEl.appendChild(imgEl);
            liEl.appendChild(strEl);
            liEl.appendChild(pEl);
            liEl.appendChild(aEl);
            let container = this.listEl;
            container.appendChild(liEl);
            

        }) 
    }
}
new App();