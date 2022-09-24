 $(document).ready(function() {
    $('.spinner').hide();

    function limpa() {
        $("#rua").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#uf").val("");
        $("#ibge").val("");
        $("#ddd").val("");
    }
    
    $("#search").click(function() {
        var cep = $('#cep').val().replace(/\D/g, '');
        if (cep != "") {
            var validacep = /^[0-9]{8}$/;
            if(validacep.test(cep)) {
                //Ativa o loading
                $('.spinner').show();

                $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                    if (!("erro" in dados)) {
                        $("#rua").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#uf").val(dados.uf);
                        $("#ibge").val(dados.ibge);
                        $("#ddd").val(dados.ddd);
                        $('.spinner').hide();
                    } 
                    else {
                        limpa();
                        alert("CEP não encontrado.");
                    }
                });
            } 
            else {
                limpa();
                alert("Formato de CEP inválido.");
            }
        }
        else {
            limpa();
            alert("Digite Algum CEP para busca");
        }
    });

    $('#cep').click(function () {
        limpa()
    });
});