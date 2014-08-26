// JavaScript Document
$(document).ready(function () {

    Score = 0;
    OOL = true;
    //suoding = false;
    //��ʼ������
    Nums = new Array(new Array(4), new Array(4), new Array(4), new Array(4));
    Init();

    $(document).bind("keydown", dispatch);

    $("#restart").bind("click", function () {
        //location.reload();
        Init();
        Score = 0;
        $("#score").text(Score);

    });
});

//��ʼ������
function Init() {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            Nums[i][j] = 0;

    var x = Math.floor(Math.random() * 4 + 0);
    var y = Math.floor(Math.random() * 4 + 0);
    Nums[x][y] = 2;

    NumsToImages();
}
//��ݰ���ִ����Ӧ����
function dispatch(event) {

    var keyCode = event.keyCode;
    //console.log(keyCode);
    switch (keyCode) {
        case 37://���ͷ
        case 65://a
            event.preventDefault();
            Left();
            CreateNewNum();
            NumsToImages();
            break;

        case 38://�ϼ�ͷ
        case 87://w
            event.preventDefault();
            Up();
            CreateNewNum();
            NumsToImages();
            break;

        case 39://�Ҽ�ͷ
        case 68://d
            event.preventDefault();
            Right();
            CreateNewNum();
            NumsToImages();
            break;

        case 40://�¼�ͷ
        case 83://s
            event.preventDefault();
            Down();
            CreateNewNum();
            NumsToImages();
            break;

        default:
        //alert("���̵ķ��������������ң�");
    }
    IfWin();
    if (CanContinue() == false) {
        if (confirm('��Ϸ�����Ƿ����¿�ʼ��'))
            $("#restart").trigger("click");
    }
}
//�Ƿ�Win
function IfWin() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (Nums[i][j] == 2048) {
                alert("û�뵽����ô����������ս4096ô��");
                //l_fuck=1;
            }
            if (Nums[i][j] == 4096) {
                alert("Ĥ�ݴ���");
                //l_fuck=2;
            }
        }
    }
}

//�ж���Ϸ�ܷ����,True�ɼ���false��Ϸ����
function CanContinue() {
    var temp = 0;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 4; j++) {
            temp = Nums[i][j] - Nums[i + 1][j];
            if (temp == 0) {
                return true;
            }
        }
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            temp = Nums[i][j] - Nums[i][j + 1];
            if (temp == 0) {
                return true;
            }
        }
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (Nums[i][j] == 0)
                return true;
        }
    }
    return false;
}


//�����µ�����
function CreateNewNum() {
    //���������������Ϊ�����ֵ����
    var i = Math.floor(Math.random() * 4 + 0);
    var j = Math.floor(Math.random() * 4 + 0);
    var F = 0;

    for (var x = 0; x < 4; x++)
        for (var y = 0; y < 4; y++)
            if (Nums[x][y] == 0)
                F = 1;

    if (F == 0 || OOL == false) {
        //suoding=true;
        return;
    }

    if (Nums[i][j] >= 2) {
        CreateNewNum();
    }
    else {
        //����2�ļ��ʴ�Щ
        var flag = Math.floor(Math.random() * 4 + 0);
        if (flag == 0 || flag == 1 || flag == 3)
            Nums[i][j] = 2;
        else
            Nums[i][j] = 4;
        //var Id = ""+i+j;
//		var url = "image/"+Nums[i][j]+".png";
//		$("#div"+Id).css("background","url("+url+")");

        //suoding=false;
    }
}
//��������е�������ҳ����ʾ��Ӧ��ͼƬ
function NumsToImages() {

    var Id, url;
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            Id = "" + i + j;
            url = "image/" + Nums[i][j] + ".png";
            if (Nums[i][j] > 0) {
                //console.log(" "+i+" "+j+" "+Nums[i][j]);
                //console.log($("#div"+Id));
                $("#div" + Id).css("background", "url(" + url + ")");
            } else {
                $("#div" + Id).css("background", "");
            }
        }
    $("#score").text(Score);
}

//���ϲ���
function Up() {

    var m = 0, n = 0;
    OOL = false;
    var f = new Array(4);

    for (var i = 0; i < 4; i++) {
        for (var pp = 0; pp < 4; pp++) {
            f[pp] = 0;
        }
        m = 0;
        n = 0;
        for (var j = 0; j < 4; j++) {
            //console.log(Nums[j][i]);
            if (Nums[j][i] >= 2) {
                m = m + 1;
            }

        }
        //console.log("m"+m);
        switch (m) {
            case 0:
                break;
            case 1:
                for (var t = 0; t < 4; t++) {
                    if (Nums[t][i] >= 2) {
                        Nums[0][i] = Nums[t][i];
                        if (t > 0) {
                            Nums[t][i] = 0;
                            OOL = true;
                        }
                        m = 0;
                        break;
                    }

                }
                break;
            case 2:
                for (var t = 0; t < 4; t++)
                    if (Nums[t][i] > 0) {
                        f[n] = Nums[t][i];
                        n++;
                    }
                if (f[0] == f[1]) {
                    Nums[0][i] = f[0] + f[1];
                    Score += Nums[0][i];
                    Nums[1][i] = 0;
                    Nums[2][i] = 0;
                    Nums[3][i] = 0;
                    OOL = true;
                    break;
                }
                else {
                    if (Nums[0][i] != f[0] || Nums[1][i] != f[1]) {
                        OOL = true;
                    }
                    Nums[0][i] = f[0];
                    Nums[1][i] = f[1];
                    Nums[2][i] = 0;
                    Nums[3][i] = 0;
                    break;
                }
                break;

            case 3:
                for (var t = 0; t < 4; t++) {
                    if (Nums[t][i] >= 2) {
                        f[n] = Nums[t][i];
                        n++;
                    }
                }
                if (f[0] == f[1]) {
                    Nums[0][i] = f[0] + f[1];
                    Score += Nums[0][i];
                    Nums[1][i] = f[2];
                    Nums[2][i] = 0;
                    Nums[3][i] = 0;
                    OOL = true;
                    break;
                }
                if ((f[0] != f[1]) && (f[1] == f[2])) {
                    Nums[0][i] = f[0];
                    Nums[1][i] = f[1] + f[2];
                    Score += Nums[1][i];
                    Nums[2][i] = 0;
                    Nums[3][i] = 0;
                    OOL = true;
                    break;
                }
                if ((f[0] != f[1]) && (f[1] != f[2])) {
                    if (Nums[0][i] != f[0] || Nums[1][i] != f[1] || Nums[2][i] != f[2]) {
                        OOL = true;
                    }
                    Nums[0][i] = f[0];
                    Nums[1][i] = f[1];
                    Nums[2][i] = f[2];
                    Nums[3][i] = 0;
                    break;
                }
                break;
            case 4:
                for (var t = 0; t < 4; t++) {
                    if (Nums[t][i] >= 2) {
                        f[n] = Nums[t][i];
                        n++;
                    }
                }
                if ((f[0] == f[1]) && (f[2] == f[3])) {
                    Nums[0][i] = f[0] + f[1];
                    Nums[1][i] = f[2] + f[3];
                    Score += Nums[0][i] + Nums[1][i];
                    Nums[2][i] = 0;
                    Nums[3][i] = 0;
                    OOL = true;
                    break;
                }
                if (f[0] == f[1]) {
                    Nums[0][i] = f[0] + f[1];
                    Score += Nums[0][i];
                    Nums[1][i] = f[2];
                    Nums[2][i] = f[3];
                    Nums[3][i] = 0;
                    OOL = true;
                    break;
                }
                if ((f[0] != f[1]) && (f[1] == f[2])) {
                    Nums[0][i] = f[0];
                    Nums[1][i] = f[1] + f[2];
                    Score += Nums[1][i];
                    Nums[2][i] = f[3];
                    Nums[3][i] = 0;
                    OOL = true;
                    break;
                }
                if ((f[0] != f[1]) && (f[1] != f[2]) && (f[2] == f[3])) {
                    Nums[0][i] = f[0];
                    Nums[1][i] = f[1];
                    Nums[2][i] = f[2] + f[3];
                    Score += Nums[2][i];
                    Nums[3][i] = 0;
                    OOL = true;
                    break;
                }
                break;
        }

    }
}

//���²���
function Down() {
    var m = 0, n = 0;
    OOL = false;
    var f = new Array(4);
    for (var i = 0; i < 4; i++) {
        m = 0;
        n = 0;
        for (var pp = 0; pp < 4; pp++) {
            f[pp] = 0;
        }
        for (var j = 0; j < 4; j++) {
            if (Nums[j][i] >= 2) {
                m++;
            }
        }
        if (m == 0)
            continue;
        if (m == 1) {
            for (var t = 0; t < 4; t++) {
                if (Nums[t][i] >= 2) {
                    Nums[3][i] = Nums[t][i];

                    if (t < 3) {
                        Nums[t][i] = 0;
                        OOL = true;
                    }
                    m = 0;
                    break;
                }

            }
            continue;

        }
        if (m == 2) {

            for (var t = 0; t < 4; t++)
                if (Nums[t][i] >= 2) {
                    f[n] = Nums[t][i];
                    n++;
                }
            if (f[0] == f[1]) {
                Nums[3][i] = f[0] + f[1];
                Score += Nums[3][i];
                Nums[2][i] = 0;
                Nums[1][i] = 0;
                Nums[0][i] = 0;
                OOL = true;
                continue;
            }
            else {
                if (Nums[3][i] != f[1] || Nums[2][i] != f[0])
                    OOL = true;
                Nums[3][i] = f[1];
                Nums[2][i] = f[0];
                Nums[1][i] = 0;
                Nums[0][i] = 0;

                continue;
            }
            n = 0;
            m = 0;
        }
        if (m == 3) {
            for (var t = 0; t < 4; t++) {
                if (Nums[t][i] >= 2) {
                    f[n] = Nums[t][i];
                    n++;
                }
            }
            if (f[1] == f[2]) {
                Nums[3][i] = f[1] + f[2];
                Score += Nums[3][i];
                Nums[2][i] = f[0];
                Nums[1][i] = 0;
                Nums[0][i] = 0;
                OOL = true;
                continue;
            }

            if ((f[0] == f[1]) && (f[1] != f[2])) {
                Nums[3][i] = f[2];
                Nums[2][i] = f[0] + f[1];
                Score += Nums[2][i];
                Nums[1][i] = 0;
                Nums[0][i] = 0;
                OOL = true;
                continue;
            }
            if ((f[0] != f[1]) && (f[1] != f[2])) {
                if (Nums[3][i] != f[2] || Nums[2][i] != f[1] || Nums[1][i] != f[0])
                    OOL = true;
                Nums[3][i] = f[2];
                Nums[2][i] = f[1];
                Nums[1][i] = f[0];
                Nums[0][i] = 0;

                continue;
            }
            n = 0;
            m = 0;
        }
        if (m == 4) {
            for (var t = 0; t < 4; t++) {
                if (Nums[t][i] >= 2) {
                    f[n] = Nums[t][i];
                    n++;
                }
            }
            if ((f[0] == f[1]) && (f[2] == f[3])) {
                Nums[3][i] = f[2] + f[3];
                Nums[2][i] = f[0] + f[1];
                Score += Nums[3][i] + Nums[2][i];
                Nums[1][i] = 0;
                Nums[0][i] = 0;
                OOL = true;
                continue;
            }
            if (f[2] == f[3]) {
                Nums[3][i] = f[2] + f[3];
                Score += Nums[3][i];
                Nums[2][i] = f[1];
                Nums[1][i] = f[0];
                Nums[0][i] = 0;
                OOL = true;
                continue;
            }
            if ((f[1] == f[2]) && (f[2] != f[3])) {
                Nums[3][i] = f[3];
                Nums[2][i] = f[1] + f[2];
                Score += Nums[2][i];
                Nums[1][i] = f[0];
                Nums[0][i] = 0;
                OOL = true;
                continue;
            }
            if ((f[0] == f[1]) && (f[1] != f[2]) && (f[2] != f[3])) {
                Nums[3][i] = f[3];
                Nums[2][i] = f[2];
                Nums[1][i] = f[1] + f[0];
                Score += Nums[1][i];
                Nums[0][i] = 0;
                OOL = true;
                continue;
            }
            n = 0;
            m = 0;
        }
    }

}

//�������
function Left() {
    var m, n;
    OOL = false;
    var f = new Array(4);
    for (var i = 0; i < 4; i++) {

        for (var pp = 0; pp < 4; pp++) {
            f[pp] = 0;
        }
        m = 0;
        n = 0;
        for (var j = 0; j < 4; j++) {
            if (Nums[i][j] > 0) {
                m++;
            }
        }
        switch (m) {
            case 0:
                break;
            case 1:
                for (var t = 1; t < 4; t++) {
                    if (Nums[i][t] >= 2) {
                        Nums[i][0] = Nums[i][t];
                        Nums[i][t] = 0;
                        OOL = true;

                    }

                }
                break;
            case 2:

                for (var t = 0; t < 4; t++)
                    if (Nums[i][t] >= 2) {
                        f[n] = Nums[i][t];
                        n++;
                    }
                if (f[0] == f[1]) {
                    Nums[i][0] = f[0] + f[1];
                    Score += Nums[i][0];
                    Nums[i][1] = 0;
                    Nums[i][2] = 0;
                    Nums[i][3] = 0;
                    OOL = true;
                    break;
                }
                else {
                    if (Nums[i][0] != f[0] || Nums[i][1] != f[1]) {
                        OOL = true;
                    }
                    Nums[i][0] = f[0];
                    Nums[i][1] = f[1];
                    Nums[i][2] = 0;
                    Nums[i][3] = 0;
                    break;
                }
                break;

            case 3:
                for (var t = 0; t < 4; t++)
                    if (Nums[i][t] >= 2) {
                        f[n] = Nums[i][t];
                        n++;
                    }
                if (f[0] == f[1]) {
                    Nums[i][0] = f[0] + f[1];
                    Score += Nums[i][0];
                    Nums[i][1] = f[2];
                    Nums[i][2] = 0;
                    Nums[i][3] = 0;
                    OOL = true;
                    break;
                }

                if ((f[1] == f[2]) && (f[0] != f[1])) {
                    Nums[i][0] = f[0];
                    Nums[i][1] = f[1] + f[2];
                    Score += Nums[i][1];
                    Nums[i][2] = 0;
                    Nums[i][3] = 0;
                    OOL = true;
                    break;
                }
                if ((f[0] != f[1]) && (f[1] != f[2])) {
                    if (Nums[i][0] != f[0] || Nums[i][1] != f[1] || Nums[i][2] != f[2])
                        OOL = true;
                    Nums[i][0] = f[0];
                    Nums[i][1] = f[1];
                    Nums[i][2] = f[2];
                    Nums[i][3] = 0;

                    break;
                }
                break;

            case 4:
                for (var t = 0; t < 4; t++) {
                    if (Nums[i][t] > 0) {
                        f[n] = Nums[i][t];
                        n++;
                    }
                }
                if ((f[0] == f[1]) && (f[2] == f[3])) {
                    Nums[i][0] = f[0] + f[1];
                    Nums[i][1] = f[2] + f[3];
                    Score += Nums[i][0] + Nums[i][1];
                    Nums[i][2] = 0;
                    Nums[i][3] = 0;
                    OOL = true;
                    break;
                }
                if (f[0] == f[1]) {
                    Nums[i][0] = f[0] + f[1];
                    Score += Nums[i][0];
                    Nums[i][1] = f[2];
                    Nums[i][2] = f[3];
                    Nums[i][3] = 0;
                    OOL = true;
                    break;
                }
                if ((f[0] != f[1]) && (f[1] == f[2])) {
                    Nums[i][0] = f[0];
                    Nums[i][1] = f[1] + f[2];
                    Score += Nums[i][1];
                    Nums[i][2] = f[3];
                    Nums[i][3] = 0;
                    OOL = true;
                    break;
                }
                if ((f[0] != f[1]) && (f[1] != f[2]) && (f[2] == f[3])) {
                    Nums[i][0] = f[0];
                    Nums[i][1] = f[1];
                    Nums[i][2] = f[2] + f[3];
                    Score += Nums[i][2];
                    Nums[i][3] = 0;
                    OOL = true;
                    break;
                }

                break;
        }
    }
}

//���Ҳ���
function Right() {
    var m, n;
    OOL = false;
    var f = new Array(4);
    for (var i = 0; i < 4; i++) {

        for (var pp = 0; pp < 4; pp++) {
            f[pp] = 0;
        }
        m = 0;
        n = 0;
        for (var j = 0; j < 4; j++) {
            if (Nums[i][j] >= 2) {
                m++;
            }
        }
        switch (m) {
            case 0:
                break;
            case 1:
                for (var t = 0; t < 4; t++) {
                    if (Nums[i][t] >= 2) {
                        Nums[i][3] = Nums[i][t];
                        if (t != 3) {
                            OOL = true;
                            Nums[i][t] = 0;
                        }
                    }

                }
                break;

            case 2:

                for (var t = 0; t < 4; t++)
                    if (Nums[i][t] >= 2) {
                        f[n] = Nums[i][t];
                        n++;
                    }
                if (f[0] == f[1]) {
                    Nums[i][3] = f[0] + f[1];
                    Score += Nums[i][3];
                    Nums[i][2] = 0;
                    Nums[i][1] = 0;
                    Nums[i][0] = 0;
                    n = 0;
                    m = 0;
                    OOL = true;
                    break;
                }
                else {
                    if (Nums[i][3] != f[1] || Nums[i][2] != f[0])
                        OOL = true;
                    Nums[i][3] = f[1];
                    Nums[i][2] = f[0];
                    Nums[i][1] = 0;
                    Nums[i][0] = 0;
                    break;
                }
                break;

            case 3:
                for (var t = 0; t < 4; t++)
                    if (Nums[i][t] >= 2) {
                        f[n] = Nums[i][t];
                        n++;
                    }
                if (f[1] == f[2]) {
                    Nums[i][3] = f[1] + f[2];
                    Score += Nums[i][3];
                    Nums[i][2] = f[0];
                    Nums[i][1] = 0;
                    Nums[i][0] = 0;
                    OOL = true;
                    break;
                }

                if ((f[1] != f[2]) && (f[0] == f[1])) {
                    Nums[i][3] = f[2];
                    Nums[i][2] = f[0] + f[1];
                    Score += Nums[i][2];
                    Nums[i][1] = 0;
                    Nums[i][0] = 0;
                    OOL = true;
                    break;
                }
                if ((f[0] != f[1]) && (f[1] != f[2])) {
                    if (Nums[i][3] != f[2] || Nums[i][2] != f[1] || Nums[i][1] != f[0])
                        OOL = true;
                    Nums[i][3] = f[2];
                    Nums[i][2] = f[1];
                    Nums[i][1] = f[0];
                    Nums[i][0] = 0;
                    break;
                }
                break;

            case 4:
                for (var t = 0; t < 4; t++) {
                    if (Nums[i][t] > 0) {
                        f[n] = Nums[i][t];
                        n++;
                    }
                }
                if ((f[0] == f[1]) && (f[2] == f[3])) {
                    Nums[i][3] = f[2] + f[3];
                    Nums[i][2] = f[0] + f[1];
                    Score += Nums[i][3] + Nums[i][2];
                    Nums[i][1] = 0;
                    Nums[i][0] = 0;
                    OOL = true;
                    break;
                }
                if (f[2] == f[3]) {
                    Nums[i][3] = f[2] + f[3];
                    Score += Nums[i][3];
                    Nums[i][2] = f[1];
                    Nums[i][1] = f[0];
                    Nums[i][0] = 0;
                    OOL = true;
                    break;
                }
                if ((f[2] != f[3]) && (f[1] == f[2])) {
                    Nums[i][3] = f[3];
                    Nums[i][2] = f[1] + f[2];
                    Score += Nums[i][2];
                    Nums[i][1] = f[0];
                    Nums[i][0] = 0;
                    OOL = true;
                    break;
                }
                if ((f[0] == f[1]) && (f[1] != f[2]) && (f[2] != f[3])) {
                    Nums[i][3] = f[3];
                    Nums[i][2] = f[2];
                    Nums[i][1] = f[0] + f[1];
                    Score += Nums[i][1];
                    Nums[i][0] = 0;
                    OOL = true;
                    break;
                }

                break;
        }
    }
}