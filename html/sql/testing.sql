--������ ����� icsd15107
set serveroutput on;
create function K_Means(IN length NUMBER(4)) as{
DECLARE 
   --���������� ����� ���� ������ ��� ��� ���������� ��� �������
   TYPE CityID IS VARRAY(15) OF NUMBER(3) not null;
   TYPE CityName IS VARRAY(15) OF VARCHAR2(15);
   TYPE CityLAT IS VARRAY(15) OF NUMBER(6);
   TYPE CityLON IS VARRAY(15) OF NUMBER(6);
   mID CityID:=CityID();
   mNAME CityName:=CityName();
   mLAT CityLAT:=CityLAT();
   mLON CityLON:=CityLON();
   choise NUMBER(2);
   counter NUMBER(38);
   rand NUMBER;
   Center1 NUMBER;
   Center2 NUMBER;
   TYPE TEAM IS VARRAY(15) OF VARCHAR2(15);
   mTEAM1 TEAM :=TEAM();
   mTEAM2 TEAM :=TEAM();
   No1 NUMBER;
   No2 NUMBER;
   NewCenter1LAT NUMBER;
   NewCenter1LON NUMBER;
   Counter1 NUMBER;
   NewCenter2LAT NUMBER;
   NewCenter2LON NUMBER;
   Counter2 NUMBER;
   SavedNewCenter1LAT NUMBER;
   SavedNewCenter1LON NUMBER;
   SavedNewCenter2LAT NUMBER;
   SavedNewCenter2LON NUMBER;
   CounterID NUMBER;
BEGIN 
    --������� extend ��� ������������� ���� ������� �� ������� ������� �����
    mID.extend();
    mNAME.extend();
    mLAT.extend();
    mLON.extend();
    mTEAM1.extend();
    mTEAM2.extend();
    /*mID  :=CityID(1,2,3,4,5,6);
    mName:=CityName('ATHINA','PARISI','BELGIO','KANADA','AMERICA','TEXAS');
    mLAT :=CityLAT(90.0,75.6,100.754,-40.0,-60.5,-10.0);
    mLON :=CityLON(80.4,90.1,50.1,3.1,-2.1,-10.1);
    mTEAM1:=TEAM('no','no','no','no','no','no');
    mTEAM2:=TEAM('no','no','no','no','no','no');*/
    
    /*!!!!!!!!!!!!!!!EXEI PROBLIMA TO LOOP KAI THA TO KANO XEIROKINITA ME DIKES MOU TIMES POU MPOREITE NA ALLAKSETE GIATI DEN GINETAI ALLIOS, THA AFISO OMOS TON KODIKA 
    AN THELETE NA DEITE POS KSEKINISA NA TO KANO!!!!!!!!!!!!!!!!!!!!
    --counter:=1;
    --choise:=1;
    LOOP
        dbms_output.put_line('Xristi dose epilogi');
        choise:=&choise;
        IF (choise=1) THEN
            mID(counter):=5;
            mNAME(counter):='&onoma_polis';
            mLAT(counter):=&geografiko_platos;
            mLON(counter):=&geografiko_mikos;
            counter:=counter+1;
        ELSIF (choise=2) THEN
            dbms_output.put_line('ID    POLI    LAT    LON');
            FOR i in 1 .. 15 LOOP
                dbms_output.put_line(mID(i) || ': ' || mNAME(i) || '->' || mLAT(i) || '--' || mLON(i));
            END LOOP;
        ELSIF (choise=3) THEN
            dbms_output.put_line('Loading..');
            rand := dbms_random.value(1,15);
            Center1:=mID(rand);
            rand := dbms_random.value(1,15);
            Center2:=mID(rand);
            .....
        ELSE
            EXIT;
        END IF;
        EXIT WHEN choise<1 OR choise>3;
    END LOOP;
    */
    --����������� ��� ������ ��� �� ������ �� ������ ���������� ���
    CounterID:=1;
    LOOP
        mID(counter):= CounterID;
        mNAME(counter):=select Country_Name from psd_project.dbo.countries;
        mLAT(counter):=select Pos_Lati from psd_project.dbo.countries;
        mLON(counter):=select Pos_Long from psd_project.dbo.countries;
        counter:=counter+1;
        CounterID:=CounterID+1;
        EXIT WHEN counter==length;
    END LOOP;

    FOR i IN length LOOP
    dbms_output.put_line(mID(i) || ': ' || mNAME(i) || '-> ' || mLAT(i) || '|' || mLON(i));
    END LOOP;
    dbms_output.put_line('Loading..');
    --��������� 2 ������� ������ (����� ��� � ���� ��� ����� �� ����� ��� ������ ����)
    rand := dbms_random.value(1,length);
    Center1:=mID(rand);
    rand := dbms_random.value(1,length);
    Center2:=mID(rand);
    --������������� ��� ������������� ��� 2 ������ ��� ��� ������������� ��� 2 �������
    NewCenter1LAT:=mLAT(Center1);
    NewCenter1LON:=mLON(Center1);
    NewCenter2LAT:=mLAT(Center2);
    NewCenter2LON:=mLON(Center2);
    dbms_output.put_line('Ta kentra einai: 1)' || mNAME(Center1) || ' 2)' || mNAME(Center2));
    --��������� 10 ����� ���� �������
    FOR i IN 1 .. 5 LOOP
        dbms_output.put_line('---- Omadopoiisi No: ' || i || ' ----'); 
        --������� ��� ��������� ������ ���� ����� � ���� ����, �� ���� ����� ������, ����������� ��� ���������� ��� ��� ������� ���� ���������� ����� ��� ������
        FOR j IN 1 .. length LOOP
        No1:=SQRT((mLAT(j)-NewCenter1LAT)*(mLAT(j)-NewCenter1LAT)+(mLON(j)-NewCenter1LON)*(mLON(j)-NewCenter1LON));
        No2:=SQRT((mLAT(j)-NewCenter2LAT)*(mLAT(j)-NewCenter2LAT)+(mLON(j)-NewCenter2LON)*(mLON(j)-NewCenter2LON));
        dbms_output.put_line('Loop/Poli '|| j || ' Apostasi apo proto kentro: '||No1);
        dbms_output.put_line('Loop/Poli '|| j || ' Apostasi apo deutero kentro: '||No2);
            IF(No1<No2) THEN
                mTEAM1(j):=mNAME(j);
                dbms_output.put_line('Mpike stin omada 1');
            ELSE
                mTEAM2(j):=mNAME(j);
                dbms_output.put_line('Mpike stin omada 2');
            END IF;
        END LOOP;
        --�������� ��� ����� ����� ������ ������ ������� � ����� (����������� ���� + ����) �� ���������� ������� �� ������������� ��� ������� ���� �� ������������������
        NewCenter1LAT:=0;
        NewCenter1LON:=0;
        NewCenter2LAT:=0;
        NewCenter2LON:=0;
        Counter1:=0;
        Counter2:=0;
        --��������� ��� �� ����� �� �� ����������� �� ���� ������������ ��� ���� ������ ������� �� �� ����� ������ ����� �� ����
        FOR j IN 1 .. length LOOP
             IF mName(j)=mTEAM1(j) THEN
                   NewCenter1LAT:=NewCenter1LAT+mLAT(j);
                   NewCenter1LON:=NewCenter1LON+mLON(j);
                   Counter1:=Counter1+1;   
            ELSE
                NewCenter2LAT:=NewCenter2LAT+mLAT(j);
                NewCenter2LON:=NewCenter2LON+mLON(j);
                Counter2:=Counter2+1;  
            END IF;
        END LOOP;
        
        DBMS_OUTPUT.NEW_LINE;
        dbms_output.put_line('Poleis stin omada 1: '|| Counter1);
        dbms_output.put_line('Poleis stin omada 2: '|| Counter2);
        
        --������� ����� ������ ���� � ���� ����� ��� �� ������� ��� �������� ��� �� ������ �� ���������� ������
        --���� ������ ������ ������ ����� �� ��� ���� ������ ��� ������ ���� ������ �� �������� ��� ��� ������ �� ����� �������� �� �� ����� ��� ��� ������� 1
        IF Counter1=0 THEN
        Counter1:=1;
        END IF;
        IF Counter2=0 THEN
        Counter2:=1;
        END IF;
        --��� ������������ �������� ��������� ���� �� �� �������� ��� ������ ��� ���� ������
        NewCenter1LAT:=NewCenter1LAT / Counter1-1;
        NewCenter1LON:=NewCenter1LON / Counter1-1;
        NewCenter2LAT:=NewCenter2LAT / Counter2-1;
        NewCenter2LON:=NewCenter2LON / Counter2-1;
        --���� �� �� ������������ ������������� ����� �����, ������ �� ������ ����� ��� ������� ���� ������ ��� ��� ��������� �� ������������ ��������� ��� ���������
        EXIT WHEN (NewCenter1LAT=SavedNewCenter1LAT AND SavedNewCenter1LON=NewCenter1LON AND NewCenter2LAT=SavedNewCenter2LAT AND SavedNewCenter2LON=NewCenter2LON);
        --������ ����������� �������� ������������� ��� ���� ������������� ������� ��� ������������ ��� ������������� ��� �� ��� ���������� �� ��� �������� ��� �� EXIT
        dbms_output.put_line('Neo platos omada 1: '|| NewCenter1LAT || ' Neo mikos omada 1: '||NewCenter1LON);
        dbms_output.put_line('Neo platos omada 2: '|| NewCenter2LAT || ' Neo mikos omada 2: '||NewCenter2LON);
        SavedNewCenter1LAT:=NewCenter1LAT;
        SavedNewCenter1LON:=NewCenter1LON;
        SavedNewCenter2LAT:=NewCenter2LAT;
        SavedNewCenter2LON:=NewCenter2LON;
        DBMS_OUTPUT.NEW_LINE;
        --������� ���� ������� ����� �� � ���� 6 ����� ���� ���� 4 ��� ������ ������ ��� ��� ���� ��� loop ����� �������� ���� ������� ��� �� ���� �� �������� �����
        --�� ������� �� ����� ��� ���� ����� �����/������ ��� ������ ��� �� ���� ������� �� ��� ����� ����� ����
        mTEAM1:=TEAM('no','no','no','no','no','no');
        mTEAM2:=TEAM('no','no','no','no','no','no');
    END LOOP;
    --����������� �� �������� ���� ��� ������ ��� ��� ����� ���� ������ ��� �� ����� �� ������ �� ��������� ������������ �� ���� ���� ��� ������
     FOR i IN 1 .. length LOOP
     IF mNAME(i)=mTEAM1(i) THEN
     dbms_output.put_line('TEAM 1 : '||mID(i) || ': ' || mNAME(i) || '-> ' || mLAT(i) || '|' || mLON(i));
     ELSE
     dbms_output.put_line('TEAM 2 : '||mID(i) || ': ' || mNAME(i) || '-> ' || mLAT(i) || '|' || mLON(i));
     END IF;
     END LOOP;
END;
}